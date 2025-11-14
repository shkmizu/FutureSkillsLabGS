export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validateSkillName = (name: string): ValidationResult => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      valid: false,
      message: 'Skill name is required',
    };
  }

  if (trimmedName.length < 2) {
    return {
      valid: false,
      message: 'Skill name must be at least 2 characters',
    };
  }

  if (trimmedName.length > 50) {
    return {
      valid: false,
      message: 'Skill name must be less than 50 characters',
    };
  }

  return {
    valid: true,
    message: 'Valid',
  };
};

export const validateLearningGoal = (goal: string): ValidationResult => {
  const trimmedGoal = goal.trim();

  if (!trimmedGoal) {
    return {
      valid: false,
      message: 'Learning goal is required',
    };
  }

  if (trimmedGoal.length < 10) {
    return {
      valid: false,
      message: 'Learning goal must be at least 10 characters',
    };
  }

  if (trimmedGoal.length > 500) {
    return {
      valid: false,
      message: 'Learning goal must be less than 500 characters',
    };
  }

  return {
    valid: true,
    message: 'Valid',
  };
};
