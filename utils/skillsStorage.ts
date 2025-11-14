import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'FUTURE_SKILLS_DB';

export interface Skill {
  id: string;
  name: string;
  category: 'Hard Skill' | 'Soft Skill';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  learningGoal: string;
  createdAt: string;
}

export const getAllSkills = async (): Promise<Skill[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error getting skills:', error);
    return [];
  }
};

export const saveSkill = async (skill: Omit<Skill, 'id' | 'createdAt'>): Promise<boolean> => {
  try {
    const skills = await getAllSkills();
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    skills.push(newSkill);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
    return true;
  } catch (error) {
    console.error('Error saving skill:', error);
    return false;
  }
};

export const updateSkill = async (updatedSkill: Skill): Promise<boolean> => {
  try {
    const skills = await getAllSkills();
    const index = skills.findIndex((s) => s.id === updatedSkill.id);
    if (index !== -1) {
      skills[index] = updatedSkill;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating skill:', error);
    return false;
  }
};

export const deleteSkill = async (id: string): Promise<boolean> => {
  try {
    const skills = await getAllSkills();
    const filteredSkills = skills.filter((s) => s.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSkills));
    return true;
  } catch (error) {
    console.error('Error deleting skill:', error);
    return false;
  }
};

export const filterSkills = async (category: 'All' | 'Hard Skill' | 'Soft Skill'): Promise<Skill[]> => {
  try {
    const skills = await getAllSkills();
    if (category === 'All') {
      return skills;
    }
    return skills.filter((s) => s.category === category);
  } catch (error) {
    console.error('Error filtering skills:', error);
    return [];
  }
};
