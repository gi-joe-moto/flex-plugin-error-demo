import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import HelloWorld from './HelloWorld';
import EmailIcon from './EmailIcon';

const PLUGIN_NAME = 'ErrorDemoPlugin';

export default class ErrorDemoPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    // Create custom Channel
    const emailChatChannel = flex.DefaultTaskChannels.createDefaultTaskChannel('Email', task => task.taskChannelUniqueName === 'email');
    
    // Basic settings
    emailChatChannel.templates.TaskListItem.firstLine = task => (task.attributes.fromAddress);
    emailChatChannel.templates.TaskCanvasHeader.title = task => (task.attributes.fromAddress);

    emailChatChannel.templates.IncomingTaskCanvas.firstLine = task => (task.attributes.subject);
    emailChatChannel.templates.IncomingTaskCanvas.secondLine = task => (task.attributes.bodyPreview);

    emailChatChannel.icons.active = <EmailIcon key="email-icon" />;
    emailChatChannel.icons.list = <EmailIcon key="email-icon" />;
    emailChatChannel.icons.main = <EmailIcon key="email-icon" />;

    emailChatChannel.addedComponents = [
      {
        target: 'TaskCanvasTabs',
        component: <HelloWorld
          key="helloWorld"
          id="helloWorld"
          icon={<EmailIcon size="1.5em" />}
          manager={manager}
        />,
        options: {
          sortOrder: 0,
          align: 'start',
          if: props => props.task.status === 'accepted'
        }
      }
    ];

    flex.TaskChannels.register(emailChatChannel);
  }
}
