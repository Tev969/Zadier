import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { PING } from './ping';
import { PONG } from './randomSound';

export type Command = {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
};

export const COMMANDS: Array<Command> = [PING,PONG];
