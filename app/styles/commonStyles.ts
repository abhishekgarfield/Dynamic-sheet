import {StyleSheet} from 'react-native';
import {spacing} from '../theme';
export const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainerPadding: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  subContainer: {
    marginBottom: spacing.md,
  },
  fieldsContainer: {
    marginBottom: spacing.md - spacing.spacing15,
  },
});
