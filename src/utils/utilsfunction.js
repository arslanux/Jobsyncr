export function areObjectsEqual(obj1, obj2) {
  // Get the keys of obj1
  const keys1 = Object.keys(obj1);

  // Check if the number of keys is the same in both objects
  if (keys1.length !== Object.keys(obj2).length) {
    return false;
  }

  // Iterate through the keys and compare values
  for (const key of keys1) {
    // Check if the key exists in obj2
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    // Check if the values are objects, if so, recursively compare them
    if (
      typeof val1 === "object" &&
      val1 !== null &&
      typeof val2 === "object" &&
      val2 !== null
    ) {
      if (!areObjectsEqual(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      // If the values are not objects, simply compare them
      return false;
    }
  }

  // If all keys and values are equal, return true
  return true;
}

export function arePersonalObjectsEqual(obj1, obj2) {
  const personalKeys = [
    "prefix",
    "first_name",
    "last_name",
    "middle_name",
    "bio",
    "referral_source_id",
    "profile_pic",
  ];
  const contactKeys = [
    "address_one",
    "address_two",
    "country_id",
    "state_id",
    "city_id",
    "pincode",
    "tel_num",
    "mobile",
    "secondary_email",
    "current_place",
    "mobile_country_code",
    "tel_country_code",
  ];
  const socialKey = ["linkedin_url", "twitter_url"];
  const bioKeys = [
    "race_ethnicity_id",
    "gender_id",
    "disability_id",
    "veteran_id",
  ];
  // Get the keys of obj1
  const keys1 = Object.keys(obj1);

  // Check if the number of keys is the same in both objects
  if (keys1.length !== Object.keys(obj2).length) {
    return {
      status: false,
      message: "",
    };
  }

  // Iterate through the keys and compare values
  for (const key of keys1) {
    // Check if the key exists in obj2 and if the values are equal
    if (obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
      continue; // Values are equal, move on to the next key
    } else {
      if (personalKeys.includes(key)) {
        return {
          status: false,
          message: "General Information",
        };
      } else if (contactKeys.includes(key)) {
        return {
          status: false,
          message: "Contact Information",
        };
      } else if (socialKey.includes(key)) {
        return {
          status: false,
          message: "Social Information",
        };
      } else if (bioKeys.includes(key)) {
        return {
          status: false,
          message: "Equal Opportunity Employment Info",
        };
      } else {
        return {
          status: false,
          message: "",
        };
      }
    }
  }

  // If all keys and values are equal, return true
  return {
    status: true,
    message: "",
  };
}
export function compareArraysOfObjects(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr2.length; i++) {
    if (areObjectsEqual(arr1[i], arr2[i]) === false) {
      return false;
    }
  }

  return true;
}
export function generateQueryString(params) {
  const queryString = Object.entries(params)
    .filter(
      ([key, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryString;
}

export function capitalizeString(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
