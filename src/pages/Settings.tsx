import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  BookOpen, 
  Database, 
  Clock, 
  Mail, 
  Users, 
  Save,
  Trash2,
  AlertTriangle,
  FileText,
  Globe,
  Printer,
  CreditCard,
  HardDrive,
  Send
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security & Access', icon: Shield },
    { id: 'books', name: 'Books & Catalog', icon: BookOpen },
    ...(isAdmin ? [
      { id: 'database', name: 'Database & Backup', icon: Database },
      { id: 'loanRules', name: 'Loan Rules', icon: Clock },
      { id: 'email', name: 'Email Templates', icon: Mail },
      { id: 'members', name: 'Member Settings', icon: Users },
      { id: 'system', name: 'System', icon: Globe },
      { id: 'reports', name: 'Reports', icon: FileText },
      { id: 'integrations', name: 'Integrations', icon: CreditCard },
      { id: 'backup', name: 'Backup', icon: HardDrive },
    ] : [
      { id: 'notifications', name: 'Notifications', icon: Bell },
      { id: 'privacy', name: 'Privacy', icon: Shield },
    ]),
  ];

  const emailTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to City Library!',
      description: 'Sent to new members after registration',
    },
    {
      id: 'due-reminder',
      name: 'Due Date Reminder',
      subject: 'Your book is due soon',
      description: 'Sent 3 days before book due date',
    },
    {
      id: 'overdue',
      name: 'Overdue Notice',
      subject: 'Book Return Overdue',
      description: 'Sent when book is overdue',
    },
    {
      id: 'reservation',
      name: 'Reservation Available',
      subject: 'Your reserved book is available',
      description: 'Sent when reserved book becomes available',
    },
  ];
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    className={`w-full flex items-center px-4 py-3 text-sm focus:outline-none ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Right content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <Card>
              <Card.Header>
                <Card.Title>General Settings</Card.Title>
              </Card.Header>
              
              <Card.Content className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Library Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Library Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        defaultValue="City Central Library"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        rows={3}
                        defaultValue="123 Library Street, Cityville, State 12345"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          defaultValue="info@citylibrary.org"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Working Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weekdays
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                          defaultValue="09:00"
                        />
                        <span className="self-center">-</span>
                        <input
                          type="time"
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                          defaultValue="18:00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weekends
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                          defaultValue="10:00"
                        />
                        <span className="self-center">-</span>
                        <input
                          type="time"
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                          defaultValue="16:00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
              
              <Card.Footer className="flex justify-end">
                <Button
                  variant="primary"
                  leftIcon={<Save size={16} />}
                  onClick={() => console.log('Save settings')}
                >
                  Save Changes
                </Button>
              </Card.Footer>
            </Card>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <Card>
                <Card.Header>
                  <Card.Title>Email Settings</Card.Title>
                </Card.Header>
                <Card.Content className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">SMTP Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SMTP Server
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          placeholder="smtp.example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Port
                        </label>
                        <input
                          type="number"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          placeholder="587"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          placeholder="username@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Send size={16} />}
                        onClick={() => console.log('Test email connection')}
                      >
                        Test Connection
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Email Templates</h3>
                    <div className="space-y-4">
                      {emailTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                              <p className="text-sm text-gray-500">{template.description}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => console.log('Edit template', template.id)}
                            >
                              Edit Template
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Email Notifications</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Due Date Reminders</h4>
                        <p className="text-sm text-gray-500">Send reminders before books are due</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Overdue Notifications</h4>
                        <p className="text-sm text-gray-500">Send notifications for overdue books</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Reservation Notifications</h4>
                        <p className="text-sm text-gray-500">Send notifications when reserved books are available</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <Card>
                <Card.Header>
                  <Card.Title>System Settings</Card.Title>
                </Card.Header>
                <Card.Content className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">System Maintenance</h3>
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        leftIcon={<Database size={16} />}
                        onClick={() => console.log('Clear cache')}
                      >
                        Clear System Cache
                      </Button>
                      <div>
                        <Button
                          variant="outline"
                          leftIcon={<HardDrive size={16} />}
                          onClick={() => console.log('Optimize database')}
                        >
                          Optimize Database
                        </Button>
                        <p className="mt-1 text-sm text-gray-500">Last optimization: 7 days ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">System Logs</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm text-gray-600 overflow-auto max-h-40">
                          {`[2024-02-20 10:15:23] System backup completed successfully
[2024-02-20 09:30:15] Database optimization completed
[2024-02-20 09:00:00] Daily maintenance tasks started
[2024-02-19 23:59:59] Daily system report generated`}
                        </pre>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<FileText size={16} />}
                        onClick={() => console.log('Download logs')}
                      >
                        Download Full Logs
                      </Button>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Integration Settings</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Payment Gateway</h4>
                        <p className="text-sm text-gray-500">Configure payment processing for fines and fees</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Configure payment gateway')}
                      >
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Printer Integration</h4>
                        <p className="text-sm text-gray-500">Setup receipt and barcode printing</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Printer size={16} />}
                        onClick={() => console.log('Configure printers')}
                      >
                        Setup Printers
                      </Button>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {activeTab === 'backup' && (
            <Card>
              <Card.Header>
                <Card.Title>Backup & Recovery</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Automated Backups</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Daily Backups</h4>
                        <p className="text-sm text-gray-500">Automatic backup every day at midnight</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Backup Retention Period
                      </label>
                      <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                        <option>7 days</option>
                        <option>14 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Manual Backup</h3>
                  <div className="space-y-4">
                    <Button
                      variant="primary"
                      leftIcon={<HardDrive size={16} />}
                      onClick={() => console.log('Create backup')}
                    >
                      Create Backup Now
                    </Button>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Backups</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>backup_2024_02_20.zip</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<FileText size={16} />}
                          >
                            Download
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>backup_2024_02_19.zip</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<FileText size={16} />}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Database Recovery</h3>
                  <div className="space-y-4">
                    <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-warning-800">Warning</h4>
                          <p className="text-sm text-warning-700">
                            Database recovery will overwrite current data. Make sure to create a backup before proceeding.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Backup File
                      </label>
                      <input
                        type="file"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        accept=".zip,.sql,.dump"
                      />
                    </div>

                    <Button
                      variant="danger"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => console.log('Restore backup')}
                    >
                      Restore from Backup
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          )}
          
          {/* Placeholders for other tabs */}
          {!['general', 'loanRules', 'email', 'system', 'backup'].includes(activeTab) && (
            <Card>
              <Card.Header>
                <Card.Title>
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </Card.Title>
              </Card.Header>
              
              <Card.Content>
                <div className="py-8 text-center">
                  <p className="text-gray-500">Settings for this section would be displayed here.</p>
                </div>
              </Card.Content>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}