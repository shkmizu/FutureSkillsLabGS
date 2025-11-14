export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validateSkillName = (name: string): ValidationResult => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      valid: false,
      message: 'O nome da habilidade é obrigatório',
    };
  }

  if (trimmedName.length < 2) {
    return {
      valid: false,
      message: 'O nome da habilidade deve ter pelo menos 2 caracteres',
    };
  }

  if (trimmedName.length > 50) {
    return {
      valid: false,
      message: 'O nome da habilidade deve ter menos de 50 caracteres',
    };
  }

  return {
    valid: true,
    message: 'Válido',
  };
};

export const validateLearningGoal = (goal: string): ValidationResult => {
  const trimmedGoal = goal.trim();

  if (!trimmedGoal) {
    return {
      valid: false,
      message: 'O objetivo de aprendizado é obrigatório',
    };
  }

  if (trimmedGoal.length < 10) {
    return {
      valid: false,
      message: 'O objetivo de aprendizado deve ter pelo menos 10 caracteres',
    };
  }

  if (trimmedGoal.length > 500) {
    return {
      valid: false,
      message: 'O objetivo de aprendizado deve ter menos de 500 caracteres',
    };
  }

  return {
    valid: true,
    message: 'Válido',
  };
};