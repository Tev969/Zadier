import type { Command } from '@commands';
import type { CommandInteraction, GuildMember, StringSelectMenuInteraction } from 'discord.js';
import { ActionRowBuilder, ComponentType, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';

export const RUSSIAN: Command = {
    data: new SlashCommandBuilder()
        .setName('russianroulette')
        .setDescription('Try a russian roulette and get mute if you lose ? Do you have balls ? @_@ '),

    async execute(interaction: CommandInteraction) {
        const { user } = interaction;

        // Création du menu déroulant avec les options de chiffres
        const numbers = [1, 2, 3, 4, 5, 6];
        const numberOptions = numbers.map((num) => ({
            label: num.toString(),
            value: num.toString(),
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('menu')
            .setPlaceholder('Prend un chiffre')
            .setMaxValues(6)
            .addOptions(numberOptions);

        const numberRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

        await interaction.reply({
            content: 'Please select a number :',
            components: [numberRow],
            ephemeral: false,
        });

        const filter = (interaction: StringSelectMenuInteraction): boolean =>
            interaction.customId === 'menu' && interaction.user.id === user.id;
        const collector = interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.SelectMenu,
            max: 1,
            filter,
            time: 20000,
        });

        collector?.on('collect', async (interaction: StringSelectMenuInteraction) => {
            const botNumber = Math.floor(Math.random() * 6) + 1;
            const selectedValue = interaction.values[0];
            if (!selectedValue) {
                throw 'undefined';
            }
            if (botNumber === +selectedValue) {
                if (interaction.member) {
                    if ('user' in interaction.member) {
                        await (interaction.member as GuildMember).timeout(100_000);
                    }
                }
            }

            await interaction.reply(`You selected ${selectedValue} and bot selected ${botNumber}`);
            collector?.stop(); // Arrêter le collecteur après avoir récupéré la valeur
        });
    },
};
