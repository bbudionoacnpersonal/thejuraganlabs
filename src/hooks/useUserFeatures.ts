import { useCallback } from 'react';
import useAuthStore from '@/store/authStore';
import { ROLES, GROUP_DESCRIPTIONS } from '@/config/roles';
import type { RoleFeatures } from '@/types';

export const useUserFeatures = () => {
  const { user } = useAuthStore();
  
  const hasFeature = useCallback((feature: keyof RoleFeatures['features']) => {
    if (!user) return false;
    return ROLES[user.role].features[feature];
  }, [user]);

  const getDashboardItems = useCallback(() => {
    if (!user) return [];
    return ROLES[user.role].dashboardItems;
  }, [user]);

  const getAccessibleGroups = useCallback(() => {
    if (!user) return [];
    return ROLES[user.role].agentGroups.map(group => ({
      id: group,
      name: group.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: GROUP_DESCRIPTIONS[group as keyof typeof GROUP_DESCRIPTIONS]
    }));
  }, [user]);

  const canAccessGroup = useCallback((group: string) => {
    if (!user) return false;
    return ROLES[user.role].agentGroups.includes(group);
  }, [user]);

  return {
    hasFeature,
    getDashboardItems,
    getAccessibleGroups,
    canAccessGroup,
    roleName: user ? ROLES[user.role].name : null
  };
};

export default useUserFeatures;