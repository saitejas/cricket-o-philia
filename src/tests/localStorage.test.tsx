import { writeToStorage, readFromStorage } from '../service/localStorage' ;

describe('writeToStorage', () => {
  it('should write data to localStorage', () => {
    const key: string | null = 'testKey';
    const mockData = { value: 'testValue' };

    writeToStorage(key, mockData);

    const data: string | null = localStorage.getItem(key);
    const storedData = JSON.parse(data ?? '');
    expect(storedData).toEqual(mockData);
  });
});

describe('readFromStorage', () => {
  it('should read data from localStorage', () => {
    const key = 'testKey';
    const data = { value: 'testValue' };
    localStorage.setItem(key, JSON.stringify(data));

    const retrievedData = readFromStorage(key);

    expect(retrievedData).toEqual(data);
  });

  it('should handle invalid JSON data gracefully', () => {
    const key = 'testKey';
    const invalidData = 'invalidJSON';
    localStorage.setItem(key, invalidData);

    const retrievedData = readFromStorage(key);

    expect(retrievedData).toBe(invalidData);
  });

  it('should return null for non-existent key', () => {
    const nonExistentKey = 'nonExistentKey';

    const retrievedData = readFromStorage(nonExistentKey);

    expect(retrievedData).toBe(null);
  });
});