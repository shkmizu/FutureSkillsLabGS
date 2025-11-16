import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Plus, Zap } from 'lucide-react-native';
import { SkillCard } from '@/components/SkillCard';
import { getAllSkills, deleteSkill, Skill } from '@/utils/skillsStorage';

type FilterType = 'All' | 'Hard Skill' | 'Soft Skill';

export default function HomeScreen() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [loading, setLoading] = useState(true);

  const loadSkills = async () => {
    setLoading(true);
    const loadedSkills = await getAllSkills();
    setSkills(loadedSkills);
    applyFilter(loadedSkills, selectedFilter);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadSkills();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const applyFilter = (skillsList: Skill[], filter: FilterType) => {
    if (filter === 'All') {
      setFilteredSkills(skillsList);
    } else {
      setFilteredSkills(skillsList.filter((skill) => skill.category === filter));
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
    applyFilter(skills, filter);
  };

  const handleEdit = (skill: Skill) => {
    router.push({
      pathname: '/(tabs)/edit-skill',
      params: { skillData: JSON.stringify(skill) },
    });
  };

  const handleDelete = async (id: string) => {
    const success = await deleteSkill(id);
    if (success) {
      // Alerta de sucesso APÓS a exclusão bem-sucedida
      Alert.alert('Sucesso', 'Habilidade removida!', [
        { 
          text: 'OK', 
          onPress: loadSkills // Recarrega a lista APÓS o usuário fechar o alerta.
        }
      ]);
    } else {
      Alert.alert('Erro', 'Falha ao excluir a habilidade. Tente novamente.', [{ text: 'OK' }]);
    }
  };

  const handleAddSkill = () => {
    router.push('/(tabs)/add-skill');
  };

  const renderFilterButton = (filter: FilterType, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive,
      ]}
      onPress={() => handleFilterChange(filter)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === filter && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Zap size={64} color="#6C63FF" />
      <Text style={styles.emptyTitle}>Nenhuma habilidade adicionada ainda</Text>
      <Text style={styles.emptySubtitle}>Comece a construir seu futuro!</Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={handleAddSkill}
        activeOpacity={0.8}
      >
        <Plus size={20} color="#FFFFFF" />
        <Text style={styles.emptyButtonText}>Adicionar Sua Primeira Habilidade</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Carregando habilidades...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          {renderFilterButton('All', 'Todas as Habilidades')}
          {renderFilterButton('Hard Skill', 'Hard Skills')}
          {renderFilterButton('Soft Skill', 'Soft Skills')}
        </View>
        {filteredSkills.length > 0 && (
          <Text style={styles.countText}>
            {filteredSkills.length} {filteredSkills.length === 1 ? 'habilidade' : 'habilidades'}
          </Text>
        )}
      </View>

      <FlatList
        data={filteredSkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard skill={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        contentContainerStyle={
          filteredSkills.length === 0
            ? styles.emptyListContainer
            : styles.listContainer
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {filteredSkills.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddSkill}
          activeOpacity={0.8}
        >
          <Plus size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
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
    marginTop: 16,
    fontSize: 16,
    color: '#B0B0B0',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0F0F1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E4E',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B0B0B0',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  countText: {
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    marginTop: 4,
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8B8B8B',
    marginBottom: 32,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});