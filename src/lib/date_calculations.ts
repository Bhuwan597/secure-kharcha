import NepaliDate from "nepali-date-converter";

export const calculateTime = (createdAt?: string) => {
  return new Date(createdAt || Date.now()).toLocaleTimeString("en-NP", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function calculateNepaliDateAndTime(englishDate?: string) {
  const nepaliDate = new NepaliDate(new Date(englishDate || ""));
  const formattedNepaliDate = nepaliDate.format("ddd DD, MMMM YYYY");
  const time = calculateTime(englishDate);
  return {
    nepaliDate: formattedNepaliDate,
    time,
  };
}

export function getRelativeTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffTime = Number(now) - Number(date);
  const seconds = Math.floor(diffTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "just now";
  } else if (minutes === 1) {
    return "1 minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return "1 hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return "yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}
