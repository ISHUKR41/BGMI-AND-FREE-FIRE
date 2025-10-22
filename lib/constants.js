// Tournament configurations for BGMI and Free Fire
export const TOURNAMENT_CONFIG = {
  bgmi: {
    solo: {
      maxSlots: 100,
      entryFee: 20,
      maxPlayers: 1,
      winnerPrize: 350,
      runnerUpPrize: 250,
      perKill: 9,
    },
    duo: {
      maxSlots: 50,
      entryFee: 40,
      maxPlayers: 2,
      winnerPrize: 350,
      runnerUpPrize: 250,
      perKill: 9,
    },
    squad: {
      maxSlots: 25,
      entryFee: 80,
      maxPlayers: 4,
      winnerPrize: 350,
      runnerUpPrize: 250,
      perKill: 9,
    },
  },
  freefire: {
    solo: {
      maxSlots: 48,
      entryFee: 20,
      maxPlayers: 1,
      winnerPrize: 350,
      runnerUpPrize: 150,
      perKill: 5,
    },
    duo: {
      maxSlots: 24,
      entryFee: 40,
      maxPlayers: 2,
      winnerPrize: 350,
      runnerUpPrize: 150,
      perKill: 5,
    },
    squad: {
      maxSlots: 12,
      entryFee: 80,
      maxPlayers: 4,
      winnerPrize: 350,
      runnerUpPrize: 150,
      perKill: 5,
    },
  },
}

export const GAME_INFO = {
  bgmi: {
    fullName: 'Battlegrounds Mobile India',
    description:
      'BGMI is India\'s favorite battle royale game where 100 players parachute onto an island to scavenge for weapons and fight to be the last person standing. Experience intense combat, strategic gameplay, and thrilling victories!',
    features: [
      'Up to 100 players in Solo mode',
      'Up to 50 teams in Duo mode',
      'Up to 25 teams in Squad mode',
      'Realistic graphics and immersive gameplay',
      'Multiple maps and game modes',
    ],
  },
  freefire: {
    fullName: 'Garena Free Fire',
    description:
      'Free Fire is the ultimate survival shooter game where you compete in fast-paced 10-minute matches against 48 players. Land on an island, loot weapons, and survive to become the last one standing in this action-packed battle royale!',
    features: [
      'Up to 48 players in Solo mode',
      'Up to 24 teams in Duo mode',
      'Up to 12 teams in Squad mode',
      'Quick 10-minute matches',
      'Unique characters with special abilities',
    ],
  },
}

export const RULES = {
  bgmi: {
    title: 'BGMI Tournament Rules & Regulations',
    generalRules: [
      {
        title: 'Game Version',
        description: 'All matches must be played on the latest official version of BGMI (Battlegrounds Mobile India) available on Google Play Store or App Store.'
      },
      {
        title: 'Device Requirements',
        description: 'Only mobile phones are allowed. Use of emulators, tablets, or any external device (keyboard/mouse) is strictly prohibited.'
      },
      {
        title: 'Network Connection',
        description: 'Players must ensure a stable internet connection before starting the match. Poor connectivity will not be considered as a reason for rematch.'
      },
      {
        title: 'Fair Play Policy',
        description: 'Strictly no use of hacks, mod APKs, scripts, or third-party software. No teaming with other players outside your registered team. No abusive language, harassment, or toxic behavior.'
      },
      {
        title: 'Room Credentials',
        description: 'The Room ID and Password will be shared 30 minutes before the match on the registered WhatsApp number. Sharing with non-registered players results in immediate disqualification.'
      },
      {
        title: 'Game Mode',
        description: 'Classic Mode only. Map: Erangel / Miramar / Sanhok / Vikendi (based on announcement). Perspective: TPP (Third Person Perspective). Server: Asia Server only.'
      },
      {
        title: 'Team Composition',
        description: 'Solo: 1 player | Duo: 2 players | Squad: 4 players. All players must register with valid in-game IDs. Any mismatch results in disqualification.'
      },
      {
        title: 'No Substitutes',
        description: 'Substitute players are not allowed once registration closes. Only registered team members can participate.'
      },
      {
        title: 'Match Start Time',
        description: 'Players must join the room within 5 minutes of the ID and Password being shared. Late entry will not be entertained.'
      }
    ],
    soloRules: [
      { title: 'Entry Fee', description: '₹20 per player' },
      { title: 'Max Players', description: '100 players' },
      { title: 'Winner Prize', description: '₹350' },
      { title: 'Runner-Up', description: '₹250' },
      { title: 'Per Kill Reward', description: '₹9' },
      { title: 'Device', description: 'Only one device and one account allowed. Multi-login or dual device usage leads to immediate ban.' }
    ],
    duoRules: [
      { title: 'Entry Fee', description: '₹40 per team' },
      { title: 'Max Teams', description: '50 teams' },
      { title: 'Winner Prize', description: '₹350' },
      { title: 'Runner-Up', description: '₹250' },
      { title: 'Per Kill Reward', description: '₹9' },
      { title: 'Team Requirements', description: 'Both teammates must enter the room on time. If one member fails to join, the team still plays as solo. No refund will be issued.' }
    ],
    squadRules: [
      { title: 'Entry Fee', description: '₹80 per team' },
      { title: 'Max Teams', description: '25 teams' },
      { title: 'Winner Prize', description: '₹350' },
      { title: 'Runner-Up', description: '₹250' },
      { title: 'Per Kill Reward', description: '₹9' },
      { title: 'Team Composition', description: 'Team must consist of 4 registered players only. Missing players cannot be replaced after registration closes. If fewer than 4 players join, match continues as is (no compensation).' }
    ],
    paymentRules: [
      'Entry fees must be paid via the QR code before form submission',
      'Upload a valid screenshot of the transaction and enter the transaction ID',
      'Fake, duplicate, or incomplete payments will result in auto rejection',
      'No refunds after successful registration',
      'Refunds are only applicable if the match is canceled by the admin',
      'Prize money will be transferred within 24 hours of match completion',
      'Admin\'s decision will be final in all disputes'
    ],
    disqualificationCriteria: [
      'Using hacks or illegal tools',
      'Teaming up with other players in solo matches',
      'Sharing room credentials publicly',
      'Using fake payment screenshot',
      'Failing to follow instructions given by admins',
      'Any violation of above rules can lead to temporary or permanent ban from future tournaments'
    ]
  },
  freefire: {
    title: 'Free Fire Tournament Rules & Regulations',
    generalRules: [
      {
        title: 'Game Version',
        description: 'All matches must be played on the latest official version of Garena Free Fire (Max).'
      },
      {
        title: 'Device Restrictions',
        description: 'Only smartphones are allowed. Use of emulators or unfair third-party software will result in a permanent ban.'
      },
      {
        title: 'Account Requirement',
        description: 'Players must register using their original Free Fire UID. Using guest or temporary accounts is not allowed.'
      },
      {
        title: 'Fair Play',
        description: 'Strictly no hacks, scripts, auto-headshots, or mod menus. No teaming or collusion between different squads. Toxic or abusive behavior will lead to disqualification.'
      },
      {
        title: 'Room ID & Password',
        description: 'Room credentials will be shared 30 minutes before the match on the team leader\'s registered WhatsApp number. Sharing it with unregistered players leads to permanent disqualification.'
      },
      {
        title: 'Game Mode',
        description: 'Mode: Battle Royale. Map: Bermuda or Purgatory (decided before match). Perspective: TPP only.'
      },
      {
        title: 'Team Requirements',
        description: 'Solo: 1 player | Duo: 2 players | Squad: 4 players. All names and UIDs must match registration details.'
      },
      {
        title: 'Connectivity',
        description: 'Players must ensure stable internet. No rematch for disconnections or technical errors from the player side.'
      }
    ],
    soloRules: [
      { title: 'Entry Fee', description: '₹20 per player' },
      { title: 'Max Players', description: '48 players' },
      { title: 'Winner Prize', description: '₹350' },
      { title: 'Runner-Up', description: '₹150' },
      { title: 'Per Kill Reward', description: '₹5' },
      { title: 'Account Usage', description: 'Player must use registered UID only. Teaming or forming alliances in solo will result in ban + reward cancellation.' }
    ],
    duoRules: [
      { title: 'Entry Fee', description: '₹40 per team' },
      { title: 'Max Teams', description: '24 teams' },
      { title: 'Winner Prize', description: '₹350' },
      { title: 'Runner-Up', description: '₹150' },
      { title: 'Per Kill Reward', description: '₹5' },
      { title: 'Team Composition', description: 'Both players must be from the same registered team. No substitutions after registration.' }
    ],
    squadRules: [
      { title: 'Entry Fee', description: '₹80 per team' },
      { title: 'Max Teams', description: '12 teams' },
      { title: 'Winner Prize', description: '₹350' },
      { title: 'Runner-Up', description: '₹150' },
      { title: 'Per Kill Reward', description: '₹5' },
      { title: 'Team Composition', description: 'Only registered members can join the match room. Admin will remove unregistered members if found inside the room.' }
    ],
    paymentRules: [
      'Pay entry fees through the provided QR code',
      'Upload transaction screenshot and valid transaction ID',
      'Invalid or duplicate transactions will be rejected',
      'Refunds are not allowed unless the tournament is canceled by the admin',
      'All prizes will be credited within 24 hours to the registered team leader',
      'If cheating is detected post-match, prize money will be withheld',
      'Admin team reserves the right to modify or cancel any match if technical or security issues arise'
    ],
    disqualificationCriteria: [
      'Using any kind of hack/mod',
      'Multiple account login during the same match',
      'Sharing room ID publicly',
      'Fake transaction details',
      'Failing to follow admin instructions',
      'Admin decisions are final and cannot be challenged'
    ]
  }
}

