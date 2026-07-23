
export const apiCall = async (table: string, operation: 'select' | 'insert' | 'update', data?: any, filter?: { column: string, value: any }) => {
  if (operation === 'select') {
    const data = JSON.parse(localStorage.getItem(table) || '[]');
    if (filter) {
      return data.filter((item: any) => item[filter.column] === filter.value);
    }
    return data;
  }
  
  if (operation === 'insert') {
    const dataList = JSON.parse(localStorage.getItem(table) || '[]');
    const newData = { id: Date.now().toString(), ...data };
    dataList.push(newData);
    localStorage.setItem(table, JSON.stringify(dataList));
    return newData;
  }
  
  if (operation === 'update') {
    const dataList = JSON.parse(localStorage.getItem(table) || '[]');
    const index = dataList.findIndex((item: any) => item[filter.column] === filter.value);
    if (index !== -1) {
      dataList[index] = { ...dataList[index], ...data };
      localStorage.setItem(table, JSON.stringify(dataList));
      return dataList[index];
    }
    return null;
  }
  
  return { success: true };
};
