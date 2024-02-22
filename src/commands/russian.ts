import { Command } from '@commands';
import {  SlashCommandBuilder , CommandInteraction ,  ActionRowBuilder , ButtonBuilder , ButtonStyle , Client , Message } from 'discord.js';

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
     const { client , user } = interaction


     const accept = new ButtonBuilder()
     .setCustomId('confirm')
     .setLabel('Prendre le risque.')
     .setStyle(ButtonStyle.Danger)

     const decline = new ButtonBuilder()
     .setCustomId('decline')
     .setLabel('Bah alors ?')
     .setStyle(ButtonStyle.Secondary)
    }


};