const baseUrl = '/api';

export const findSummoner = async (region, username) => {
  const response = await fetch(`${baseUrl}/summoners/${region}/${username}`);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response.json());
  }
}