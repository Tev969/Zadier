import type { Command } from '@commands';
import type { CommandInteraction, GuildMember } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

// TEMPS EN MS / 2 SECONDES
const TIMEOUT_DURATION = 120_000;
const MAX_NUMBER_CHOICE = 6;

/**
 * @command     - russian_roulette
 * @description - Try a russian roulette and get muted if you lose ? Do you have balls ? @_@
 * @permission  - None
 */
export const RUSSIAN: Command = {
    data: new SlashCommandBuilder()
        .setName('russian_roulette')
        .setDescription('Try a russian roulette and get muted if you lose ? Do you have balls ? @_@ ')
        .addIntegerOption((option) =>
            option
                .setName('number')
                .setDescription('choice between one and six')
                .setRequired(true)
                .setMaxValue(MAX_NUMBER_CHOICE)
                .setMinValue(1),
        ),
    async execute(interaction: CommandInteraction) {
        const choice = interaction.options.get('number')?.value as number;
        const botChoice = Math.floor(Math.random() * MAX_NUMBER_CHOICE) + 1;

        if (choice === botChoice) return interaction.reply('En voila un chanceux :p');

        await (interaction.member as GuildMember).timeout(TIMEOUT_DURATION);
        return interaction.reply(`EH BAM 2 MINUTES DANS TA GUEULE IL FALLAIT DIRE LE CHIFFRE ${botChoice} IDIOT`);
    },
};
