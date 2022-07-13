
export const textTransform = {
  resolveReactions: (textReact: string) => {
    switch (textReact) {
      case 'like' :
        return 'Me gusta'
      case 'love':
        return 'Me encanta'
      case 'haha':
        return 'Me divierte'
      case 'wow':
        return 'Me asombra'
      case 'sad':
        return 'Me entristese'
      case 'angry':
        return 'Me enoja'
      default:
        return ''
    }
  }
}
