import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Edit, Trash2, TrendingUp, Award, Target } from 'lucide-react-native';
import { Skill } from '@/utils/skillsStorage';

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'Beginner':
      return '*';
    case 'Intermediate':
      return '**';
    case 'Advanced':
      return '***';
    default:
      return '*';
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return '#4ECDC4';
    case 'Intermediate':
      return '#FFD93D';
    case 'Advanced':
      return '#6C63FF';
    default:
      return '#4ECDC4';
  }
};

const getTipForBeginner = (category: string) => {
  const tips = {
    'Hard Skill': [
      'Dica: Comece com cursos online para iniciantes!',
      'Dica: Pratique 10 minutos por dia.',
      'Dica: Crie pequenos projetos para aplicar o que você aprende.',
      'Dica: Junte-se a comunidades online para suporte.',
    ],
    'Soft Skill': [
      'Dica: Pratique em situações reais diariamente.',
      'Dica: Leia livros e artigos sobre o tema.',
      'Dica: Busque feedback de mentores ou colegas.',
      'Dica: Estabeleça metas pequenas e alcançáveis a cada semana.',
    ],
  };

  const categoryTips = tips[category as keyof typeof tips] || tips['Hard Skill'];
  return categoryTips[Math.floor(Math.random() * categoryTips.length)];
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onEdit, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Excluir Habilidade', // Traduzido
      `Tem certeza que deseja excluir "${skill.name}"?`, // Traduzido
      [
        {
          text: 'Cancelar', // Traduzido
          style: 'cancel',
        },
        {
          text: 'Excluir', // Traduzido
          style: 'destructive',
          onPress: () => onDelete(skill.id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.skillName}>{skill.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{skill.category}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(skill)}
            activeOpacity={0.7}
          >
            <Edit size={20} color="#6C63FF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.levelContainer}>
        <TrendingUp size={16} color={getLevelColor(skill.level)} />
        <Text style={[styles.level, { color: getLevelColor(skill.level) }]}>
          {/* Traduzir nível de proficiência */}
          {skill.level === 'Beginner' ? 'Iniciante' : skill.level === 'Intermediate' ? 'Intermediário' : 'Avançado'} {getLevelIcon(skill.level)}
        </Text>
      </View>

      <View style={styles.goalContainer}>
        <Target size={16} color="#8B8B8B" />
        <Text style={styles.goal} numberOfLines={2}>
          {skill.learningGoal}
        </Text>
      </View>

      {skill.level === 'Beginner' && (
        <View style={styles.tipContainer}>
          <Award size={14} color="#FFD93D" />
          <Text style={styles.tipText}>{getTipForBeginner(skill.category)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E2E4E',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  skillName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: '#6C63FF20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2E2E4E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  level: {
    fontSize: 14,
    fontWeight: '600',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
  },
  goal: {
    flex: 1,
    fontSize: 14,
    color: '#B0B0B0',
    lineHeight: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFD93D15',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD93D',
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#FFD93D',
    fontWeight: '500',
  },
});