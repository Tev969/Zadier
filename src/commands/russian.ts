import { Command } from '@commands';
import {  SlashCommandBuilder , CommandInteraction , SelectMenuBuilder ,  ActionRowBuilder , ButtonBuilder , ButtonStyle} from 'discord.js';

/**
 * @command     - russianRoulette 
 * @description - Amuser la galerie tel un tocard !
 * @permission  - None
 */

export const RUSSIAN: Command = {
    data: new SlashCommandBuilder()
        .setName("russianroulette")
        .setDescription("Try a russian roulette and get mute if you lose ? Do you have balls ? @_@ "),

    async execute(interaction: CommandInteraction) {
     const { user } = interaction

     const accept = new ButtonBuilder()
     .setCustomId('confirm')
     .setLabel('Prendre le risque.')
     .setStyle(ButtonStyle.Danger)

     const decline = new ButtonBuilder()
     .setCustomId('decline')
     .setLabel('Bah alors ?')
     .setStyle(ButtonStyle.Secondary)


     const filter = (i) => i.customId === "confirm" && i.userId === interaction.user.id
     const collector = interaction.channel.createMessageComponentCollector({filter , time:20000})

     //faire 2 collector quand je clique sur & des 2 button je recois un messag et supprime les butt

     
     const numbers = [1,2,3,4,5,6]
     const numbersOption = numbers.map( num => ({
          label: num.toString(),
          value: num.toString(),
     }));

     const selectMenu = new SelectMenuBuilder()
     .setCustomId('selectNumber')
     .setPlaceholder('Sélectionnez un nombre')
     .addOptions(numbersOption);

     

     const row = new ActionRowBuilder()
     .addComponents(accept , decline)
     
     await interaction.reply({

          content: `hello  for ${user}`,
          components:[row],
          ephemeral: false
     });
    },
};