import React, { useState, useEffect } => 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { updateSkill, deleteSkill, Skill } from '@/utils/skillsStorage';
import { validateSkillName, validateLearningGoal } from '@/utils/validations';

type SkillCategory = 'Hard Skill' | 'Soft Skill';
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export default function EditSkillScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Hard Skill');
  const [level, setLevel] = useState<SkillLevel>('Beginner');
  const [learningGoal, setLearningGoal] = useState('');
  const [errors, setErrors] = useState({ skillName: '', learningGoal: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (params.skillData) {
      try {
        const parsedSkill = JSON.parse(params.skillData as string) as Skill;
        setSkill(parsedSkill);
        setSkillName(parsedSkill.name);
        setCategory(parsedSkill.category);
        setLevel(parsedSkill.level);
        setLearningGoal(parsedSkill.learningGoal);
      } catch {
        Alert.alert('Erro', 'Falha ao carregar os dados da habilidade', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      }
    }
  }, [params.skillData, router]);

  const handleCategorySelect = (selectedCategory: SkillCategory) => {
    setCategory(selectedCategory);
  };

  const handleLevelSelect = (selectedLevel: SkillLevel) => {
    setLevel(selectedLevel);
  };

  const validateForm = (): boolean => {
    const nameValidation = validateSkillName(skillName);
    const goalValidation = validateLearningGoal(learningGoal);

    setErrors({
      skillName: nameValidation.valid ? '' : nameValidation.message,
      learningGoal: goalValidation.valid ? '' : goalValidation.message,
    });

    return nameValidation.valid && goalValidation.valid;
  };

  const handleSave = async () => {
    if (!skill) return;

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    const updatedSkill: Skill = {
      ...skill,
      name: skillName.trim(),
      category,
      level,
      learningGoal: learningGoal.trim(),
    };

    const success = await updateSkill(updatedSkill);
    setSaving(false);

    // CORREÇÃO: Mensagem simples e retorno automático
    if (success) {
      Alert.alert('Sucesso', 'Habilidade atualizada com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } else {
      Alert.alert('Erro', 'Falha ao atualizar a habilidade. Tente novamente.', [{ text: 'OK' }]);
    }
  };

  const handleDelete = () => {
    if (!skill) return;

    Alert.alert(
      'Excluir Habilidade',
      `Tem certeza que deseja excluir "${skill.name}"? Esta ação não pode ser desfeita.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteSkill(skill.id);
            if (success) {
              // CORREÇÃO: Mensagem simples e retorno automático
              Alert.alert('Sucesso', 'Habilidade removida com sucesso!', [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                },
              ]);
            } else {
              Alert.alert('Erro', 'Falha ao excluir a habilidade. Tente novamente.', [
                { text: 'OK' },
              ]);
            }
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  if (!skill) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome da Habilidade *</Text>
            <TextInput
              style={[styles.input, errors.skillName && styles.inputError]}
              placeholder="Ex: React Native, Oratória"
              placeholderTextColor="#5A5A6E"
              value={skillName}
              onChangeText={setSkillName}
              maxLength={50}
            />
            {errors.skillName ? (
              <Text style={styles.errorText}>{errors.skillName}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria da Habilidade *</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  category === 'Hard Skill' && styles.optionButtonActive,
                ]}
                onPress={() => handleCategorySelect('Hard Skill')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    category === 'Hard Skill' && styles.optionButtonTextActive,
                  ]}
                >
                  Hard Skill
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  category === 'Soft Skill' && styles.optionButtonActive,
                ]}
                onPress={() => handleCategorySelect('Soft Skill')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    category === 'Soft Skill' && styles.optionButtonTextActive,
                  ]}
                >
                  Soft Skill
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nível de Proficiência *</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.levelButton,
                  level === 'Beginner' && styles.levelButtonBeginner,
                ]}
                onPress={() => handleLevelSelect('Beginner')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    level === 'Beginner' && styles.levelButtonTextActive,
                  ]}
                >
                  Iniciante
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.levelButton,
                  level === 'Intermediate' && styles.levelButtonIntermediate,
                ]}
                onPress={() => handleLevelSelect('Intermediate')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    level === 'Intermediate' && styles.levelButtonTextActive,
                  ]}
                >
                  Intermediário
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.levelButton,
                  level === 'Advanced' && styles.levelButtonAdvanced,
                ]}
                onPress={() => handleLevelSelect('Advanced')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    level === 'Advanced' && styles.levelButtonTextActive,
                  ]}
                >
                  Avançado
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Objetivo de Aprendizado *</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                errors.learningGoal && styles.inputError,
              ]}
              placeholder="O que você deseja alcançar com esta habilidade?"
              placeholderTextColor="#5A5A6E"
              value={learningGoal}
              onChangeText={setLearningGoal}
              multiline
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
            />
            {errors.learningGoal ? (
              <Text style={styles.errorText}>{errors.learningGoal}</Text>
            ) : null}
            <Text style={styles.charCount}>
              {learningGoal.length}/500
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color="#FF6B6B" />
            <Text style={styles.deleteButtonText}>Excluir Habilidade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F1E',
  },
  loadingText: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  errorText: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
  },
  charCount: {
    fontSize: 12,
    color: '#8B8B8B',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B8B8B',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    alignItems: 'center',
  },
  levelButtonBeginner: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  levelButtonIntermediate: {
    backgroundColor: '#FFD93D',
    borderColor: '#FFD93D',
  },
  levelButtonAdvanced: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  levelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B8B8B',
  },
  levelButtonTextActive: {
    color: '#FFFFFF',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FF6B6B20',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    marginTop: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2E2E4E',
    backgroundColor: '#0F0F1E',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B8B8B',
  },
  saveButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
