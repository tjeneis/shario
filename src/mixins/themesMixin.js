import Repository from '@/repositories/RepositoryFactory';

const ThemeRepository = Repository.get('themes');

export default {
  data: () => ({
    themes: [],
    theme: undefined,
  }),
  created() {
    this.getThemes()
      .then(() => {
        this.theme = this.themes[0].id;
      });
  },
  computed: {
    activeTheme() {
      return this.themes.find((t) => t.id === this.theme);
    },
  },
  methods: {
    async getThemes() {
      const { data } = await ThemeRepository.get();
      this.themes = data?.items;
    },
  },
};
