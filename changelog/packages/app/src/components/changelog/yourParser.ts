import { ChangelogProps, ChangelogAction } from './types'; // Importando os tipos corretamente

export function myParser(content: string): ChangelogProps[] {
    const versions: ChangelogProps[] = [];
    const versionRegex = /## \[(.*?)\] - (\d{4}-\d{2}-\d{2})/g;
    const actionRegex = /### (.*?)\n([\s\S]*?)(?=\n## |\n?$)/g;

    let match = versionRegex.exec(content);
    while (match !== null) {
        const versionNumber = `[${match[1]}] - ${match[2]}`; // Se necessário para estrutura, mas não utilizado diretamente
        const versionContent = content.substring(match.index);
        const actions: ChangelogAction[] = [];

        let actionMatch = actionRegex.exec(versionContent);
        while (actionMatch !== null) {
            const name = actionMatch[1];
            const items = actionMatch[2].trim().split("\n").map(line => line.trim());

            actions.push({
                name,
                counter: items.length,
                content: items.join("\n"),
                icon: null // Pode ser substituído por um ícone apropriado
            });

            // Atualiza a variável `actionMatch`
            actionMatch = actionRegex.exec(versionContent);
        }

        // Agora, `versionNumber` está sendo usado corretamente dentro do objeto
        versions.push({ versionNumber, actions, versionContent });

        // Atualiza a variável `match` antes de entrar no próximo ciclo
        match = versionRegex.exec(content);
    }

    return versions;
}
