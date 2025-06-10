import Papa from "papaparse";

export const mockApi = <T>(data: T, delay = 800): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const shouldRequestSucceed = (successRate = 95): boolean => {
  return Math.random() * 100 <= successRate;
};

export const mockApiError = (
  message = "Something went wrong",
  status = 500
): Promise<never> => {
  return Promise.reject({
    message,
    status,
  });
};

export const reaJSONFile = async <T = unknown>(
  filePath: string
): Promise<T> => {
  const file = await fetch(filePath, {
    headers: {
      "Content-Type": "text/csv",
    },
  });
  const data = await file.json();
  return data;
};

export const readCSVFileWithParser = async <T = unknown[]>(
  filePath: string,
  jsonFields: string[] = ["address", "services"] // specify which fields contain JSON
): Promise<T> => {
  const file = await fetch(filePath, {
    headers: {
      "Content-Type": "text/csv",
    },
  });
  const csvText = await file.text();

  const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });

  // Helper function to check if a string is a valid number
  const isNumeric = (str: string): boolean => {
    if (str.trim() === "") return false;
    return !isNaN(Number(str)) && !isNaN(parseFloat(str));
  };

  // Parse JSON fields and convert numbers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processedData = result.data.map((row: any) => {
    const processedRow = { ...row };

    Object.keys(processedRow).forEach((key) => {
      const value = processedRow[key];

      if (typeof value === "string") {
        // Parse JSON fields first
        if (jsonFields.includes(key)) {
          try {
            processedRow[key] = JSON.parse(value);
            return; // Skip number parsing if JSON parsing succeeded
          } catch {
            console.warn(`Failed to parse JSON for field ${key}:`, value);
            // Continue to number parsing if JSON parsing fails
          }
        }

        // Try to parse as number for non-JSON fields
        if (!jsonFields.includes(key) && isNumeric(value)) {
          const numValue = parseFloat(value);
          // Use integer if it's a whole number, otherwise use float
          processedRow[key] = Number.isInteger(numValue)
            ? parseInt(value, 10)
            : numValue;
        }
      }
    });

    return processedRow;
  });

  return processedData as T;
};
