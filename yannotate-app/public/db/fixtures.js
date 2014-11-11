Ember.Fixtures = {
  user: {
    id: 1,
    name: "Diacred",
    league: "Gold V"
  },
  replay: {
    user: {
      id: 1,
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
          general: {
            content: "Hello, this is a general comment",
            comments: [
              {
                user: {
                  id: 3,
                  name: "xPeke",
                  league: "Diamond I"
                },
                content: "I don't really agree with that general comment, Sir.",
                created_at: "2014-12-04"
              },
              {
                user: {
                  id: 3,
                  name: "Tabzzz",
                  league: "Diamond I"
                },
                content: "He is right, though, xPuke.",
                created_at: "2014-12-04"
              }
            ]
          },
          timeline: [
            { time: "1:55", content: "Shoulda backed away" },
            {
              time: "5:55",
              content: "Shoulda backed away2",
              comments: [
                {
                  user: {
                    id: 3,
                    name: "xPeke",
                    league: "Diamond I"
                  },
                  content: "I don't really agree with that general comment, Sir.",
                  created_at: "2014-12-04"
                },
                {
                  user: {
                    id: 3,
                    name: "Tabzzz",
                    league: "Diamond I"
                  },
                  content: "He is right, though, xPuke.",
                  created_at: "2014-12-04"
                }
              ]
            },
            { time: "8:55", content: "Shoulda backed away3" },
            {
              time: "9:55",
              content: "Shoulda backed away4",
              comments: [
                {
                  user: {
                    id: 3,
                    name: "xPeke",
                    league: "Diamond I"
                  },
                  content: "I don't really agree with that general comment, Sir.",
                  created_at: "2014-12-04"
                },
                {
                  user: {
                    id: 3,
                    name: "Tabzzz",
                    league: "Diamond I"
                  },
                  content: "He is right, though, xPuke.",
                  created_at: "2014-12-04"
                }
              ] // Timeline entry comments

            } // Last time line entry
          ] // Timeline
        }
      }

    ]
  }
}
