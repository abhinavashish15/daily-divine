export const getDeityForDay = (date: Date = new Date()): string => {
  const day = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
  switch (day) {
    case 1:
      return 'Lord Shiva';
    case 2:
      return 'Lord Hanuman';
    case 3:
      return 'Lord Ganesha';
    case 4:
      return 'Lord Vishnu';
    case 5:
      return 'Goddess Lakshmi';
    case 6:
      return 'Lord Shani';
    case 0:
      return 'Lord Surya';
    default:
      return 'Lord Shiva'; // Fallback
  }
};
