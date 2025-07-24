function datatables() {
  return {
    headings: [],
    users: [],

    open: false,
    
    search: '',
    
    columns: [],

    get selectedUsers() {
      return this.users.filter((user) => user.selected);
    },

    init() {
      fetch('./users.json')
      .then(res => res.json())
      .then(data => {
        this.users = data.map(user => ({...user, selected: false}));
        this.headings = Object.keys(this.users[0]).map(key => ({
          key: key,
          value: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
        }));
        this.columns = this.headings.map((h) => {
          return h.key;
        });
      });
    },

    toggleColumn(key) {
      this.columns.includes(key)
        ? (this.columns = this.columns.filter((i) => i !== key))
        : this.columns.push(key);
    },

    selectAllCheckbox() {
      if (this.selectedUsers.length === this.filteredUsers.length) {
        this.filteredUsers.map((user) => (user.selected = false));
      } else {
        this.filteredUsers.map((user) => (user.selected = true));
      }
    },

    get filteredUsers() {
      if (!this.search) {
        return this.users;
      }

      return this.users.filter(user => {
        return (
          user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
          user.emailAddress.toLowerCase().includes(this.search.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  };
}