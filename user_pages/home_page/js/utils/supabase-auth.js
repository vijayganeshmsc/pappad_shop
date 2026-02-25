// Supabase Authentication Utility
// Handles common authentication operations

class SupabaseAuth {
  constructor() {
    this.client = window.supabaseClient;
    this.listeners = [];
  }

  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {object} metadata - Additional user metadata
   * @returns {Promise} - Auth response
   */
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await this.client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Sign in an existing user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Auth response
   */
  async signIn(email, password) {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      // Save session to localStorage
      if (data.session) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.user_metadata?.full_name || data.user.email.split('@')[0]);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('supabaseSession', JSON.stringify(data.session));
      }

      this.notifyListeners('signIn', data.user);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Sign out the current user
   * @returns {Promise} - Sign out response
   */
  async signOut() {
    try {
      const { error } = await this.client.auth.signOut();
      if (error) throw error;

      // Clear localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('supabaseSession');

      this.notifyListeners('signOut', null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Get current user
   * @returns {Promise} - Current user data
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await this.client.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  /**
   * Get current session
   * @returns {Promise} - Current session data
   */
  async getSession() {
    try {
      const { data: { session }, error } = await this.client.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      return { session: null, error };
    }
  }

  /**
   * Check if user is logged in
   * @returns {boolean} - True if logged in
   */
  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  /**
   * Reset password
   * @param {string} email - User email
   * @returns {Promise} - Reset response
   */
  async resetPassword(email) {
    try {
      const { data, error } = await this.client.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Subscribe to auth changes
   * @param {Function} callback - Callback function
   */
  onAuthStateChange(callback) {
    this.listeners.push(callback);
    
    // Also set up Supabase listener
    this.client.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  /**
   * Notify all listeners
   * @param {string} event - Event type
   * @param {*} data - Event data
   */
  notifyListeners(event, data) {
    this.listeners.forEach(callback => {
      callback(event, data);
    });
  }
}

// Create global auth instance
window.supabaseAuth = new SupabaseAuth();
