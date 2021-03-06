import SendBird from 'sendbird';

const CUSTOM_CHANNEL_TYPE = "Charis";

export const sbCreateGroupChannelListQuery = () => {
  const sb = SendBird.getInstance();
  const groupChannelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
  groupChannelListQuery.includeEmpty = true;
  groupChannelListQuery.customTypesFilter = [CUSTOM_CHANNEL_TYPE];
  return groupChannelListQuery;
};

export const sbGetGroupChannelList = groupChannelListQuery => {
  return new Promise((resolve, reject) => {
    groupChannelListQuery.next((channels, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channels);
      }
    });
  });
};

export const sbGetGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbLeaveGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.leave((response, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => reject(error));
  });
};

export const sbHideGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.hide((response, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => reject(error));
  });
};

export const sbCreateUserListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.createApplicationUserListQuery();
};

export const sbGetUserList = userListQuery => {
  return new Promise((resolve, reject) => {
    userListQuery.next((users, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(users);
      }
    });
  });
};

export const sbCreateGroupChannel = (inviteUserIdList, isDistinct) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    const params = new sb.GroupChannelParams();
    params.addUserIds(inviteUserIdList);
    params.isDistinct = isDistinct;
    params.customType = CUSTOM_CHANNEL_TYPE;

    sb.GroupChannel.createChannel(params, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbInviteGroupChannel = (inviteUserIdList, channelUrl) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.inviteWithUserIds(inviteUserIdList, (channel, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(channel);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};
