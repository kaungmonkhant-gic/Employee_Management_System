const formatDate = (dateString) => {
    if (!dateString) return "";
    
    const parts = dateString.split("-");
    if (parts.length === 3) {
      if (parts[2].length === 4) {
        // If the year is last, assume dd-MM-yyyy and convert
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      // Already in yyyy-MM-dd format, return as is
      return dateString;
    }
  
    return dateString; // Default return
  };