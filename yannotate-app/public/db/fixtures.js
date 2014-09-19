Ember.Fixtures = {
  user: {
    name: "Diacred",
    league: "Gold V"
  },
  replay: {
    user: {
      name: "Diacred",
      league: "Gold V"
    },
    video_id: "QMujSbIkF8M",
    lane: "mid",
    champion: "ahri",
    matchup: "zed",
    result: "win",
    kda: { k: 17, d:4, a:8 },
    description: "I struggled a lot during the laning phase and didn't ward at all. When and where should I had warded ?",
    length: "25:01",
    patch: "4.16",
    analyses: [
      {
        user: {
          name: "Rekkles",
          league: "Challenger"
        },
        content: {
          general: "Hello, this is a general comment",
          timeline: [
            { time: "1:55", comment: "Shoulda backed away" },
            { time: "5:55", comment: "Shoulda backed away" },
            { time: "8:55", comment: "Shoulda backed away" },
            { time: "9:55", comment: "Shoulda backed away" }
          ]
        }
      }

    ]
  }
}
