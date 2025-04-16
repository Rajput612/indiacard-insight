import { v4 as uuidv4 } from 'uuid';
import { CreditCard, SpendingEntry, CardRecommendationResult, RewardRule } from '@/types/spending';

// Utility: Assign unique IDs to spends if not present
function assignSpendIds(spends: SpendingEntry[]): SpendingEntry[] {
  return spends.map((spend) => ({
    id: spend.id || uuidv4(),
    ...spend
  }));
}

// Calculate reward point value
function calculateRewardValue(card: CreditCard, points: number): number {
  if (card.pointValue) {
    return points * card.pointValue;
  }
  return 0;
}

// Calculate optimal cashback or reward value for a card from available spends
function calculateCardCashback(card: CreditCard, spends: SpendingEntry[]) {
  let totalCashback = 0;
  let rewardPoints = 0;
  let detailedBreakdown: (SpendingEntry & { cashback: number; points: number })[] = [];
  let usedSpendIds = new Set<string>();
  let categoryWiseCapTracker: Record<string, number> = {};

  for (const spend of spends) {
    let applicableRule: RewardRule | null = null;
    
    // Check for matching rules
    if (card.rules) {
      for (const rule of card.rules) {
        if (
          (!rule.category || rule.category === spend.category) &&
          (!rule.subcategory || rule.subcategory === spend.subcategory) &&
          (!rule.brand || rule.brand === spend.brand) &&
          (!rule.platform || rule.platform === spend.platform) &&
          (!rule.channel || rule.channel === spend.channel) &&
          (!rule.payment_app || rule.payment_app === spend.payment_app)
        ) {
          applicableRule = rule;
          break;
        }
      }
    }

    let cashback = 0;
    let points = 0;

    if (applicableRule) {
      // Apply rule-specific rewards
      if (applicableRule.rewardType === "points") {
        points = (spend.amount * applicableRule.rate) / 100;
        cashback = calculateRewardValue(card, points);
      } else {
        cashback = (spend.amount * applicableRule.rate) / 100;
      }

      // Apply caps if present
      if (applicableRule.cap && cashback > applicableRule.cap) {
        cashback = applicableRule.cap;
      }

      if (applicableRule.category && applicableRule.categoryCap) {
        const cat = applicableRule.category;
        const usedCap = categoryWiseCapTracker[cat] || 0;
        const allowedCap = Math.max(0, applicableRule.categoryCap - usedCap);
        cashback = Math.min(cashback, allowedCap);
        categoryWiseCapTracker[cat] = (usedCap + cashback);
      }
    } else if (card.defaultRate) {
      // Apply default rewards
      if (card.defaultRewardType === "points") {
        points = (spend.amount * card.defaultRate) / 100;
        cashback = calculateRewardValue(card, points);
      } else {
        cashback = (spend.amount * card.defaultRate) / 100;
      }
    }

    if (cashback > 0 || points > 0) {
      totalCashback += cashback;
      rewardPoints += points;
      if (spend.id) {
        usedSpendIds.add(spend.id);
      }
    }

    detailedBreakdown.push({ ...spend, cashback, points });
  }

  // Apply milestone bonus if applicable
  if (card.milestone && totalCashback >= card.milestone.threshold) {
    totalCashback += card.milestone.bonus;
  }

  return { totalCashback, rewardPoints, detailedBreakdown, usedSpendIds };
}

// Generate all possible card combinations
function getCardCombinations(cards: CreditCard[], maxSize: number): CreditCard[][] {
  const results: CreditCard[][] = [];
  
  function combine(current: CreditCard[], remaining: CreditCard[]) {
    if (current.length > 0 && current.length <= maxSize) {
      results.push([...current]);
    }
    for (let i = 0; i < remaining.length; i++) {
      combine([...current, remaining[i]], remaining.slice(i + 1));
    }
  }
  
  combine([], cards);
  return results;
}

// Main recommendation function with limit
export function evaluateCardCombinations(
  spends: SpendingEntry[],
  availableCards: CreditCard[],
  maxGroupSize = 3
): CardRecommendationResult[] {
  const combinations = getCardCombinations(availableCards, Math.min(maxGroupSize, 10));
  const spendsWithIds = assignSpendIds(spends);

  const evaluatedGroups = combinations.map((group): CardRecommendationResult => {
    let totalGroupCashback = 0;
    let totalGroupPoints = 0;
    let breakdown = [];
    let unallocatedSpends = [...spendsWithIds];
    let allocatedSpendIds = new Set<string>();

    for (const card of group) {
      const remainingSpends = unallocatedSpends.filter(
        spend => spend.id && !allocatedSpendIds.has(spend.id)
      );
      const result = calculateCardCashback(card, remainingSpends);
      
      totalGroupCashback += result.totalCashback;
      totalGroupPoints += result.rewardPoints;
      
      breakdown.push({
        card: card.name,
        cashback: result.totalCashback,
        rewardPoints: result.rewardPoints
      });

      result.usedSpendIds.forEach(id => allocatedSpendIds.add(id));
    }

    return {
      group: group.map(c => c.name),
      totalGroupCashback,
      totalGroupPoints,
      breakdown
    };
  });

  return evaluatedGroups
    .filter(g => g.totalGroupCashback > 0)
    .sort((a, b) => b.totalGroupCashback - a.totalGroupCashback)
    .slice(0, 10); // Limit to top 10 recommendations
}

// Format function for UI display
export function formatRecommendationSummary(result: CardRecommendationResult): string {
  const cards = result.group.join(", ");
  const cashback = result.totalGroupCashback.toFixed(2);
  const points = result.totalGroupPoints.toFixed(2);
  return `💳 Cards: ${cards}\n💰 Total Cashback: ₹${cashback}\n⭐ Points: ${points}`;
}
