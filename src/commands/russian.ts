import type { Command } from '@commands';
import type { CommandInteraction, GuildMember } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

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
                .setMaxValue(6)
                .setMinValue(1),
        ),
    async execute(interaction: CommandInteraction) {
        const choice = interaction.options.get('number')?.value as number;

        const botChoice = Math.floor(Math.random() * 6) + 1;

        if (choice === botChoice) {
            await interaction.reply({
                content: 'en voila un chanceux',
            });
        } else {
            await (interaction.member as GuildMember).timeout(120_000);
            await interaction.reply({
                content: `EH BAM 2 MINUTES DANS TA GUEULE IL FALLAIT DIRE LE CHIFFRE ${botChoice} IDIOT`,
            });
        }
    },
};
