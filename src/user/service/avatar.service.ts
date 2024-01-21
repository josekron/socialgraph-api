export class AvatarService {
  private API_URL: string = "https://randomuser.me/api/?inc=picture";

  /**
   * getRandomAvatar: returns an random avatar by calling an API.
   * We don't throw an exception if the API returns an error because the avatar is optional
   */
  async getRandomAvatar(): Promise<string> {
    let avatar: string;
    try {
      const response = await fetch(this.API_URL, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        avatar = data?.results[0]?.picture?.medium;
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    return avatar;
  }
}
