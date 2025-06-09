export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy: Record<string, number> = {
    intern: 0,
    user: 1,
    manager: 2,
    admin: 3,
  };

  const userLevel = roleHierarchy[userRole] ?? 0;
  const requiredLevel = roleHierarchy[requiredRole] ?? 0;

  return userLevel >= requiredLevel;
};

export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: 'Administrator',
    manager: 'Manager',
    user: 'User',
    intern: 'Intern',
  };

  return roleMap[role] ?? role;
};

export const getUserInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};