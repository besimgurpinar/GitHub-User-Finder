    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const userInfo = document.querySelector('#user-info');

    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const username = searchInput.value.trim();
      
      if (!username) {
        alert('Please enter a GitHub username');
        return;
      }
      
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();
        
        if (user.message === 'Not Found') {
          alert('User not found');
          return;
        }
        
        userInfo.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
          <div class="name">${user.name}</div>
          <div class="username">${user.login}</div>
          <div class="bio">${user.bio}</div>
          <div class="location">${user.location}</div>
        `;
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching user data');
      }
    });