import { Command } from '@commands';
import {
    SlashCommandBuilder,
    CommandInteraction,
    StringSelectMenuBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ButtonInteraction,
} from 'discord.js';

export const RUSSIAN: Command = {
    data: new SlashCommandBuilder()
        .setName('russianroulette')
        .setDescription('Try a russian roulette and get mute if you lose ? Do you have balls ? @_@ '),

    async execute(interaction: CommandInteraction) {
        const { user } = interaction;

        const accept = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Prendre le risque.')
            .setStyle(ButtonStyle.Danger);

        const decline = new ButtonBuilder()
            .setCustomId('decline')
            .setLabel('Bah alors ?')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(accept, decline);

        await interaction.reply({
            content: `hello  for ${user}`,
            components: [row],
            ephemeral: false,
        });

        // Filtre pour collecter les interactions du bouton "confirm" émis par l'utilisateur
        const filter = (i:ButtonInteraction) => i.customId === 'confirm' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button , max: 1, filter, time: 20000 });
        // On collecte tout les buttons , on les envoie à filter , si c'est true on envoie a collector.on , si false poubelle

        collector.on('collect', () => {
            // Faire quelque chose lorsque le bouton "confirm" est cliqué
        });

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

        interaction.followUp({
            content: 'Please select a number:',
            components: [numberRow],
        });
    },
};
