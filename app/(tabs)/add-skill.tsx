import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { saveSkill } from '@/utils/skillsStorage';
import { validateSkillName, validateLearningGoal } from '@/utils/validations';

type SkillCategory = 'Hard Skill' | 'Soft Skill';
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export default function AddSkillScreen() {
  const router = useRouter();
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Hard Skill');
  const [level, setLevel] = useState<SkillLevel>('Beginner');
  const [learningGoal, setLearningGoal] = useState('');
  const [errors, setErrors] = useState({ skillName: '', learningGoal: '' });
  const [saving, setSaving] = useState(false);

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
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    const success = await saveSkill({
      name: skillName.trim(),
      category,
      level,
      learningGoal: learningGoal.trim(),
    });

    setSaving(false);

    if (success) {
      Alert.alert('Success', 'Skill added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } else {
      Alert.alert('Error', 'Failed to save skill. Please try again.', [{ text: 'OK' }]);
    }
  };

  const handleCancel = () => {
    router.back();
  };

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
            <Text style={styles.label}>Skill Name *</Text>
            <TextInput
              style={[styles.input, errors.skillName && styles.inputError]}
              placeholder="e.g., React Native, Public Speaking"
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
            <Text style={styles.label}>Skill Category *</Text>
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
            <Text style={styles.label}>Proficiency Level *</Text>
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
                  Beginner
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
                  Intermediate
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
                  Advanced
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Learning Goal *</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                errors.learningGoal && styles.inputError,
              ]}
              placeholder="What do you want to achieve with this skill?"
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
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Skill'}
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
