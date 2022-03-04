import Repository from '@/repositories/RepositoryFactory';

const ThemeRepository = Repository.get('themes');

export default {
  data: () => ({
    themes: [],
    activeTheme: null,
  }),
  computed: {
    activeThemeConfig() {
      return this.themes.find((t) => t.id === this.activeTheme);
    },
  },
  methods: {
    async getThemes() {
      const { data } = await ThemeRepository.get();
      this.themes = data?.items;
      this.activeTheme = this.themes[0]?.id;
    },
  },
};
