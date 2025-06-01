import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ROLES } from '@/config/roles';
import useUserFeatures from '@/hooks/useUserFeatures';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Select from '@/components/ui/Select';

const UserManagementPage: React.FC = () => {
  const { hasFeature } = useUserFeatures();
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const [users, setUsers] = useState([
    { id: '1', name: 'Business User', email: 'business@example.com', role: 'business' },
    { id: '2', name: 'AI Engineer', email: 'engineer@example.com', role: 'engineer' },
    { id: '3', name: 'AI Architect', email: 'architect@example.com', role: 'architect' },
    { id: '4', name: 'AI Admin', email: 'admin@example.com', role: 'admin' },
  ]);

  const roleOptions = Object.entries(ROLES).map(([value, { name }]) => ({
    value,
    label: name,
  }));

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const renderFeatureIcon = (enabled: boolean) => {
    return enabled ? (
      <CheckIcon className="h-4 w-4 text-success-500" />
    ) : (
      <XMarkIcon className="h-4 w-4 text-error-500" />
    );
  };

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the changes
    setEditMode(false);
    setEditingUser(null);
  };

  if (!hasFeature('settings')) {
    return (
      <div className="min-h-screen bg-dark-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Access Denied</h2>
            <p className="mt-2 text-gray-400">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-1">Manage users and their access permissions</p>
          </div>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button variant="ghost" onClick={() => {
                  setEditMode(false);
                  setEditingUser(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                Edit Users
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Users Table */}
          <Card>
            <CardBody>
              <h3 className="text-lg font-medium text-white mb-4">Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-dark-border">
                      <th className="pb-3 text-sm font-medium text-gray-400">Name</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Email</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Role</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Voice Input</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Settings</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Analytics</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Models</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Teams</th>
                      {editMode && <th className="pb-3 text-sm font-medium text-gray-400">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {users.map((user) => (
                      <tr key={user.id} className="text-sm">
                        <td className="py-3 text-white">{user.name}</td>
                        <td className="py-3 text-white">{user.email}</td>
                        <td className="py-3 text-white">
                          {editMode && editingUser === user.id ? (
                            <Select
                              value={user.role}
                              options={roleOptions}
                              onChange={(value) => handleRoleChange(user.id, value as string)}
                              className="!w-40"
                            />
                          ) : (
                            ROLES[user.role as keyof typeof ROLES].name
                          )}
                        </td>
                        <td className="py-3">{renderFeatureIcon(ROLES[user.role as keyof typeof ROLES].features.voiceInput)}</td>
                        <td className="py-3">{renderFeatureIcon(ROLES[user.role as keyof typeof ROLES].features.settings)}</td>
                        <td className="py-3">{renderFeatureIcon(ROLES[user.role as keyof typeof ROLES].features.analytics)}</td>
                        <td className="py-3">{renderFeatureIcon(ROLES[user.role as keyof typeof ROLES].features.modelManagement)}</td>
                        <td className="py-3">{renderFeatureIcon(ROLES[user.role as keyof typeof ROLES].features.teamManagement)}</td>
                        {editMode && (
                          <td className="py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* Role Access Table */}
          <Card>
            <CardBody>
              <h3 className="text-lg font-medium text-white mb-4">Role Access Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-dark-border">
                      <th className="pb-3 text-sm font-medium text-gray-400">Role</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Agent Groups</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Dashboard Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {Object.entries(ROLES).map(([role, config]) => (
                      <tr key={role} className="text-sm">
                        <td className="py-3 text-white">{config.name}</td>
                        <td className="py-3 text-white">
                          {config.agentGroups.map((group) => (
                            <span key={group} className="inline-block px-2 py-1 mr-1 mb-1 bg-dark-surface rounded-md text-xs">
                              {group.split('_').join(' ')}
                            </span>
                          ))}
                        </td>
                        <td className="py-3 text-white">
                          {config.dashboardItems.map((item) => (
                            <span key={item} className="inline-block px-2 py-1 mr-1 mb-1 bg-dark-surface rounded-md text-xs">
                              {item}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserManagementPage;