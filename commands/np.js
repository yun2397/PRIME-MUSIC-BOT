const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require('../config.js');

function createProgressBar(current, total, length = 20) {
    const progress = Math.round((current / total) * length);
    const emptyProgress = length - progress;

    const progressText = '▓'.repeat(progress); // Filled part 
    const emptyProgressText = '░'.repeat(emptyProgress); // Empty part
    const time = new Date(current * 1000).toISOString().substr(11, 8);
    const endTime = new Date(total * 1000).toISOString().substr(11, 8);

    return `\`${time}\` ${progressText}${emptyProgressText} \`${endTime}\``;
}


async function nowPlaying(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('오류')
                .setDescription('❌ 현재 재생 중인 노래가 없습니다.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

       
        const progressBar = createProgressBar(player.position / 1000, player.current.info.length / 1000);

        const npEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🎵 현재 재생 중')
            .setDescription(`[${player.current.info.title} - ${player.current.info.author}](${player.current.info.uri})\n\n${progressBar}`)
            .setThumbnail(player.current.info.thumbnail)

        await interaction.reply({ embeds: [npEmbed] });

    } catch (error) {
        console.error('Error processing now playing command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('오류')
            .setDescription('❌ 요청을 처리하는 동안 오류가 발생했습니다.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "np",
    description: "현재 재생 중인 노래와 진행 바를 표시합니다",
    permissions: "0x0000000000000800",
    options: [],
    run: nowPlaying,
};
