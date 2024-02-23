import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { PING } from './ping';
import { RUSSIAN } from './russian';

type SlashCommandDescriptor = SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export type Command = {
    data: SlashCommandDescriptor;
    execute: (interaction: CommandInteraction) => Promise<void>;
};

export const COMMANDS: Array<Command> = [PING, RUSSIAN];
