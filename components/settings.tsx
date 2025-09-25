"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Lock, Plus, Edit3, Trash2, Eye, EyeOff, Check, X, Building, Shield } from "lucide-react"
import { useState } from "react"

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountName: string
  routingNumber?: string
  isDefault: boolean
}

export function Settings() {
  const [activeTab, setActiveTab] = useState<"bank" | "password">("bank")
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "Chase Bank",
      accountNumber: "****1234",
      accountName: "John Doe",
      routingNumber: "021000021",
      isDefault: true,
    },
    {
      id: "2",
      bankName: "Bank of America",
      accountNumber: "****5678",
      accountName: "John Doe",
      routingNumber: "026009593",
      isDefault: false,
    },
  ])

  const [showAddBank, setShowAddBank] = useState(false)
  const [editingBank, setEditingBank] = useState<string | null>(null)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [newBankForm, setNewBankForm] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    routingNumber: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")

  const handleAddBank = () => {
    if (!newBankForm.bankName || !newBankForm.accountNumber || !newBankForm.accountName) {
      return
    }

    const newAccount: BankAccount = {
      id: Date.now().toString(),
      bankName: newBankForm.bankName,
      accountNumber: `****${newBankForm.accountNumber.slice(-4)}`,
      accountName: newBankForm.accountName,
      routingNumber: newBankForm.routingNumber,
      isDefault: bankAccounts.length === 0,
    }

    setBankAccounts([...bankAccounts, newAccount])
    setNewBankForm({ bankName: "", accountNumber: "", accountName: "", routingNumber: "" })
    setShowAddBank(false)
    setSuccessMessage("Bank account added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteBank = (id: string) => {
    setBankAccounts(bankAccounts.filter((account) => account.id !== id))
    setSuccessMessage("Bank account removed successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSetDefault = (id: string) => {
    setBankAccounts(
      bankAccounts.map((account) => ({
        ...account,
        isDefault: account.id === id,
      })),
    )
    setSuccessMessage("Default bank account updated!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const validatePassword = (password: string): string[] => {
    const errors: string[] = []
    if (password.length < 8) errors.push("At least 8 characters")
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter")
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter")
    if (!/[0-9]/.test(password)) errors.push("One number")
    if (!/[!@#$%^&*]/.test(password)) errors.push("One special character")
    return errors
  }

  const handlePasswordChange = () => {
    const errors: string[] = []

    if (!passwordForm.currentPassword) {
      errors.push("Current password is required")
    }

    if (!passwordForm.newPassword) {
      errors.push("New password is required")
    } else {
      const passwordValidation = validatePassword(passwordForm.newPassword)
      errors.push(...passwordValidation)
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.push("Passwords do not match")
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      errors.push("New password must be different from current password")
    }

    setPasswordErrors(errors)

    if (errors.length === 0) {
      // Simulate password change
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setSuccessMessage("Password changed successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#fbc108]" />
          <span className="text-gray-400 text-sm">Secure Settings</span>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Card className="bg-green-900/20 border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">{successMessage}</span>
          </div>
        </Card>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-[#2f2f2f] rounded-xl p-1">
        <Button
          onClick={() => setActiveTab("bank")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            activeTab === "bank"
              ? "bg-[#fbc108] text-black hover:bg-[#e6ad07]"
              : "bg-transparent text-gray-400 hover:text-white hover:bg-[#3a3a3a]"
          }`}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Bank Accounts
        </Button>
        <Button
          onClick={() => setActiveTab("password")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            activeTab === "password"
              ? "bg-[#fbc108] text-black hover:bg-[#e6ad07]"
              : "bg-transparent text-gray-400 hover:text-white hover:bg-[#3a3a3a]"
          }`}
        >
          <Lock className="w-4 h-4 mr-2" />
          Change Password
        </Button>
      </div>

      {/* Bank Accounts Tab */}
      {activeTab === "bank" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Bank Accounts</h3>
            <Button
              onClick={() => setShowAddBank(true)}
              className="bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium px-4 py-2 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Account
            </Button>
          </div>

          {/* Add Bank Form */}
          {showAddBank && (
            <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">Add New Bank Account</h4>
                <Button
                  onClick={() => setShowAddBank(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Bank Name</label>
                  <Input
                    value={newBankForm.bankName}
                    onChange={(e) => setNewBankForm({ ...newBankForm, bankName: e.target.value })}
                    placeholder="Enter bank name"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Account Name</label>
                  <Input
                    value={newBankForm.accountName}
                    onChange={(e) => setNewBankForm({ ...newBankForm, accountName: e.target.value })}
                    placeholder="Enter account holder name"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Account Number</label>
                  <Input
                    value={newBankForm.accountNumber}
                    onChange={(e) => setNewBankForm({ ...newBankForm, accountNumber: e.target.value })}
                    placeholder="Enter account number"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Routing Number (Optional)</label>
                  <Input
                    value={newBankForm.routingNumber}
                    onChange={(e) => setNewBankForm({ ...newBankForm, routingNumber: e.target.value })}
                    placeholder="Enter routing number"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleAddBank}
                  className="bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium px-6 py-2 rounded-lg"
                  disabled={!newBankForm.bankName || !newBankForm.accountNumber || !newBankForm.accountName}
                >
                  Add Account
                </Button>
                <Button
                  onClick={() => setShowAddBank(false)}
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Bank Accounts List */}
          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <Card key={account.id} className="bg-[#2f2f2f] border-none rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#fbc108] rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold text-lg">{account.bankName}</h4>
                        {account.isDefault && (
                          <span className="bg-[#fbc108] text-black text-xs font-medium px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{account.accountName}</p>
                      <p className="text-gray-400 text-sm">Account: {account.accountNumber}</p>
                      {account.routingNumber && (
                        <p className="text-gray-400 text-sm">Routing: {account.routingNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!account.isDefault && (
                      <Button
                        onClick={() => handleSetDefault(account.id)}
                        size="sm"
                        variant="outline"
                        className="border-[#fbc108] text-[#fbc108] hover:bg-[#fbc108] hover:text-black"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      onClick={() => setEditingBank(account.id)}
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteBank(account.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {bankAccounts.length === 0 && (
              <Card className="bg-[#2f2f2f] border-none rounded-xl p-8 text-center">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No Bank Accounts</h4>
                <p className="text-gray-400 text-sm mb-4">Add your first bank account to start receiving payments</p>
                <Button
                  onClick={() => setShowAddBank(true)}
                  className="bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium px-6 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bank Account
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white">Change Password</h3>
            <Lock className="w-5 h-5 text-[#fbc108]" />
          </div>

          <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Current Password</label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 pr-12"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">New Password</label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 pr-12"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 p-3 bg-[#4a4a4a] rounded-lg">
                  <p className="text-gray-300 text-sm font-medium mb-2">Password Requirements:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                    {[
                      { text: "At least 8 characters", valid: passwordForm.newPassword.length >= 8 },
                      { text: "One uppercase letter", valid: /[A-Z]/.test(passwordForm.newPassword) },
                      { text: "One lowercase letter", valid: /[a-z]/.test(passwordForm.newPassword) },
                      { text: "One number", valid: /[0-9]/.test(passwordForm.newPassword) },
                      { text: "One special character", valid: /[!@#$%^&*]/.test(passwordForm.newPassword) },
                    ].map((req, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 ${req.valid ? "text-green-400" : "text-gray-400"}`}
                      >
                        {req.valid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>{req.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Confirm New Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 pr-12"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Error Messages */}
              {passwordErrors.length > 0 && (
                <Card className="bg-red-900/20 border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-medium text-sm mb-2">Please fix the following issues:</p>
                      <ul className="text-red-400 text-sm space-y-1">
                        {passwordErrors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handlePasswordChange}
                  className="bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium px-6 py-2 rounded-lg"
                  disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                >
                  Change Password
                </Button>
                <Button
                  onClick={() => setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })}
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Tips */}
          <Card className="bg-[#2f2f2f] border-none rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#fbc108] mt-0.5" />
              <div>
                <h4 className="text-white font-medium mb-2">Security Tips</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Use a unique password that you don't use elsewhere</li>
                  <li>• Consider using a password manager to generate and store strong passwords</li>
                  <li>• Change your password regularly, especially if you suspect it may be compromised</li>
                  <li>• Never share your password with anyone</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
