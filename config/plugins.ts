export default () => ({
    upload: {
        config: {
          provider: 'local',
          providerOptions: {},
          sizeLimit: 10 * 1024 * 1024,
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
});
