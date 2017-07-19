/*eslint-disable*/
import store from '../store'

export function onTeams(teams) {
  console.log('onTeams=>teams', teams)
  console.log('onTeams=>群列表', teams)
  store.commit('updateTeams', teams)
  store.commit('onInvalidTeams', teams.invalid)
}

export function onCreateTeam({state, commit}, team) {
  console.log('你创建了一个群', team)
/*
  const nim = state.nim
*/
  state.teamlist = nim.mergeTeams(state.teamlist, team)
  onTeamMembers({
    teamId: team.teamId,
    members: owner
  })
}

export function onSyncTeamMembersDone() {
  console.log('同步群列表完成')
}

export function onUpdateTeamMember({state, commit}, teamMember) {
  console.log('群成员信息更新了', teamMember)
  const nim = state.nim
  nim.onTeamMembers({
    teamId: teamMember.teamId,
    members: teamMember
  })
}

export function onTeamMembers(obj) {
  console.log('onTeamMembers:收到群成员', obj)
  store.commit('teamMembers', obj)
}

export function getTeamMembers({state, commit}, teamId) {
  const nim = state.nim
  nim.getTeamMembers({
    teamId: teamId,
    done: getTeamMembersDone
  });
}

function getTeamMembersDone(error, obj) {
  console.log(error)
  console.log(obj)
  store.commit('currentTeamMember', obj)
  console.log('获取群成员' + (!error ? '成功' : '失败'));
  if (!error) {
    onTeamMembers(obj);
  }
}

export function getUser({state, commit}, account) {
  const nim = state.nim
  nim.getUsers({
    accounts: account,
    done: getUserDone
  });
}
function getUserDone(error, users) {
  console.log('获取用户名片数组' + (!error ? '成功' : '失败'), error, users);
}


export function getTeam({state, commit}, teamId) {
  const nim = state.nim
  nim.getTeam({
    teamId: teamId,
    done: getTeamDone
  });
}

function getTeamDone(error, obj) {
  console.log(error);
  console.log('getTeamDone', obj);
  console.log('获取群' + (!error ? '成功' : '失败'));
  store.commit('currentTeam', obj)
}

// 创建普通群
export function createNormalTeam({state, commit}, accounts) {
  const nim = state.nim
  nim.createTeam({
    type: 'normal',
    name: '讨论组',
    avatar: 'avatar',
    accounts: accounts,
    ps: '我建了一个普通群',
    done: createTeamDone
  })
}

// 创建高级群
export function createAdvancedTeam({state, commit}, accounts) {
  const nim = state.nim
  nim.createTeam({
    type: 'advanced',
    name: '高级群',
    avatar: 'avatar',
    accounts: accounts,
    intro: '群简介',
    announcement: '群公告',
    // joinMode: 'needVerify',
    // beInviteMode: 'needVerify',
    // inviteMode: 'manager',
    // updateTeamMode: 'manager',
    // updateCustomMode: 'manager',
    ps: '我建了一个高级群',
    done: createTeamDone
  });
}

function createTeamDone(error, obj) {
  console.log('创建' + obj.team.type + '群' + (!error ? '成功' : '失败'), error, obj);
  if (!error) {
    onCreateTeam(obj.team, obj.owner);
  }
}