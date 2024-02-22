import type { Command } from '@commands';
import { SlashCommandBuilder } from 'discord.js';

/**
 * @command     - RandomSound
 * @description - Amuser la galerie tel un tocard !
 * @permission  - None
 */
export const RANDOMSOUND: Command = {
    data: new SlashCommandBuilder().setName('randomsound').setDescription('Amuser '),
    async execute(interaction) {
        await interaction.reply('Ping!');
    },
};
