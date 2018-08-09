import * as moment from 'moment';

export const getParticipantIdForAccountId = (accountId, participantIdentities) => {
  const participant = participantIdentities
    .find(identity => identity.player.accountId === accountId)

  if (participant) { return participant.participantId }

  return null;
}

export const getParticipant = (participantId, participants) => {
  return participants.find(p => p.participantId === participantId);
}

export const getTeamIdForParticipant = (participantId, participants) => {
  const participant = participants
    .find(p => p.participantId === participantId);

  if (participant) { return participant.teamId }

  return null;
}

export const getTeam = (teamId, teams) => {
  return teams.find(t => t.teamId === teamId) || null;
}

export const getOutcome = (participantId, participants, teams) => {
  const participantTeamId = getTeamIdForParticipant(participantId, participants);
  const team = getTeam(participantTeamId, teams);

  if (team.win === 'Fail') {
    return 'Defeat';
  } else {
    return 'Victory';
  }

}

export const getMatchDuration = (seconds) => {
  const duration = moment.duration(seconds, 'seconds');
  let durationStr = ``;

  if (duration.hours()) {
    durationStr += duration.hours() + 'h ';
  }

  if (duration.minutes()) {
    durationStr += duration.minutes() + 'm ';
  }

  if (duration.seconds()) {
    durationStr += duration.seconds() + 's ';
  }

  return durationStr.trim();
}

export const getTimeAgo = (matchDate) => {
  return moment(matchDate).fromNow();
}