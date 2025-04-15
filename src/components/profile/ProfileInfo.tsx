import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Save, RefreshCw, AlertTriangle, Info } from "lucide-react";
import { User } from "@/types/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProfileInfoProps {
  user: User;
  onUpdateProfile: (userData: Partial<User>) => void;
}

const occupationTypes = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "business", label: "Business Owner" },
  { value: "other", label: "Other" }
];

const spendingCategories = [
  "Travel",
  "Shopping",
  "Dining",
  "Entertainment",
  "Fuel",
  "Groceries",
  "Bills & Utilities",
  "Healthcare"
];

const ProfileInfo = ({ user, onUpdateProfile }: ProfileInfoProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingCibil, setIsCheckingCibil] = useState(false);
  const [showCibilDialog, setShowCibilDialog] = useState(false);
  const [cibilCheckData, setCibilCheckData] = useState({
    pan: user.pan || "",
    cibilEmail: user.cibilEmail || ""
  });
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    age: user.age || "",
    city: user.city || "",
    annualIncome: user.annualIncome || "",
    occupation: user.employmentType || "",
    existingEMIs: user.existingEMIs || "",
    preferredCategories: user.preferredCategories || [],
    pan: user.pan || "",
    cibilEmail: user.cibilEmail || ""
  });

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      onUpdateProfile({
        ...formData,
        annualIncome: Number(formData.annualIncome),
        age: Number(formData.age),
        existingEMIs: Number(formData.existingEMIs)
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCibilCheck = async () => {
    if (!validatePAN(cibilCheckData.pan)) {
      toast({
        title: "Invalid PAN",
        description: "Please enter a valid PAN number",
        variant: "destructive"
      });
      return;
    }

    if (!cibilCheckData.cibilEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your CIBIL registered email",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingCibil(true);
    setShowCibilDialog(false);
    
    try {
      // Simulate CIBIL check
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockScore = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
      
      onUpdateProfile({
        cibilScore: mockScore,
        lastCibilCheck: new Date().toISOString(),
        pan: cibilCheckData.pan,
        cibilEmail: cibilCheckData.cibilEmail
      });
      
      toast({
        title: "CIBIL Score Updated",
        description: `Your latest CIBIL score is ${mockScore}`,
      });
    } finally {
      setIsCheckingCibil(false);
    }
  };

  const getCibilScoreColor = (score?: number) => {
    if (!score) return "bg-gray-200";
    if (score >= 750) return "bg-green-500";
    if (score >= 650) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getCibilScoreText = (score?: number) => {
    if (!score) return "Not Available";
    if (score >= 750) return "Excellent";
    if (score >= 650) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Credit Score Information</CardTitle>
          <CardDescription>
            Your CIBIL score is a crucial factor in credit card approvals
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Your CIBIL Score</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCibilDialog(true)}
                disabled={isCheckingCibil}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isCheckingCibil ? 'animate-spin' : ''}`} />
                {isCheckingCibil ? 'Checking...' : 'Check Score'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Score: {user.cibilScore || 'Not Available'}</span>
                <span className="font-medium">{getCibilScoreText(user.cibilScore)}</span>
              </div>
              <Progress 
                value={user.cibilScore ? ((user.cibilScore - 300) / 5) : 0} 
                className={`h-2 ${getCibilScoreColor(user.cibilScore)}`}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>300</span>
                <span>900</span>
              </div>
              {user.lastCibilCheck && (
                <p className="text-xs text-gray-500 mt-2">
                  Last checked: {new Date(user.lastCibilCheck).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {user.cibilScore && user.cibilScore < 650 && (
            <div className="flex p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Improve Your Credit Score</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Pay your credit card bills and EMIs on time</li>
                  <li>Keep credit utilization below 30%</li>
                  <li>Maintain a good mix of credit types</li>
                  <li>Avoid multiple credit applications in short periods</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your profile to get better credit card recommendations
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleProfileUpdate}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  City
                </label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="occupation" className="text-sm font-medium">
                  Employment Type
                </label>
                <Select 
                  value={formData.occupation} 
                  onValueChange={(value) => setFormData({ ...formData, occupation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupationTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="annualIncome" className="text-sm font-medium">
                  Annual Income (₹)
                </label>
                <Input
                  id="annualIncome"
                  type="number"
                  min="0"
                  step="10000"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="existingEMIs" className="text-sm font-medium">
                  Monthly EMI Payments (₹)
                </label>
                <Input
                  id="existingEMIs"
                  type="number"
                  min="0"
                  value={formData.existingEMIs}
                  onChange={(e) => setFormData({ ...formData, existingEMIs: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Preferred Spending Categories
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {spendingCategories.map(category => (
                  <label
                    key={category}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferredCategories.includes(category)}
                      onChange={(e) => {
                        const categories = e.target.checked
                          ? [...formData.preferredCategories, category]
                          : formData.preferredCategories.filter(c => c !== category);
                        setFormData({ ...formData, preferredCategories: categories });
                      }}
                      className="rounded border-gray-300 text-navy focus:ring-navy"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="flex items-center gap-2 bg-navy hover:bg-navy/90"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={showCibilDialog} onOpenChange={setShowCibilDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check CIBIL Score</DialogTitle>
            <DialogDescription>
              Please provide your PAN and CIBIL registered email to fetch your score
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="pan" className="text-sm font-medium">
                PAN Number
              </label>
              <Input
                id="pan"
                placeholder="ABCDE1234F"
                value={cibilCheckData.pan}
                onChange={(e) => setCibilCheckData({ ...cibilCheckData, pan: e.target.value.toUpperCase() })}
                maxLength={10}
                className="uppercase"
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Enter your PAN number in the format ABCDE1234F
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cibilEmail" className="text-sm font-medium">
                CIBIL Registered Email
              </label>
              <Input
                id="cibilEmail"
                type="email"
                placeholder="you@example.com"
                value={cibilCheckData.cibilEmail}
                onChange={(e) => setCibilCheckData({ ...cibilCheckData, cibilEmail: e.target.value })}
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Use the email address registered with CIBIL
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCibilDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCibilCheck} disabled={isCheckingCibil}>
              {isCheckingCibil ? 'Checking...' : 'Check Score'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileInfo;