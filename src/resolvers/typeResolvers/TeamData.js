/* eslint-disable */
const TeamData = {
  shortName: ({ short_name }) => short_name,
  wins: ({ win }) => win || 0,
  losses: ({ loss }) => loss || 0,
  draws: ({ draws }) => draws || 0,
  HomeOverallStats: ({ strength_overall_home }) => strength_overall_home,
  AwayOverallStats: ({ strength_overall_away }) => strength_overall_away,
  HomeAttack: ({ strength_attack_home }) => strength_attack_home,
  AwayAttack: ({ strength_attack_away }) => strength_attack_away,
  HomeDefence: ({ strength_defence_home }) => strength_defence_home,
  AwayDefence: ({ strength_defence_away }) => strength_defence_away
};

export default TeamData;
