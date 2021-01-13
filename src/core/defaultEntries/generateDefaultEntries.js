import generateUniqueId from './generateUniqueId';

export const generateDefaultLabel = () => ({
  id: generateUniqueId(),
  name: 'Default label',
  description: 'Default description',
  color: '#ffad05',
  originalName: '',
  originalDescription: '',
  originalColor: '',
  action: 'create',
  validation: 'valid',
});

export const generateDefaultMilestone = () => ({
  id: generateUniqueId(),
  title: 'Default milestone',
  description: 'Default description',
  state: 'open',
  dueOn: '',
  originalTitle: '',
  originalDescription: '',
  originalState: '',
  originalDueOn: '',
  action: 'create',
  validation: 'valid',
});
