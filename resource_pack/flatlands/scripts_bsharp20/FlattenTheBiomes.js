/* eslint-disable @typescript-eslint/camelcase */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join, extname } from "path"

// Directory containing biome files
const BIOME_DIRECTORY = ".behavior_packs/flatlands/biomes"

// Desired `badger:overworld_height` component configuration
const NEW_OVERWORLD_HEIGHT_CONFIG = {
    height_params: {
        average_height: 21,
        texture_heights: [20, 21],
        clamp_heights: [20, 21],
        clamp_scales: [0, 0]
    },
    noise_params: [0.001, 0.001]
}

/**
 * Updates the `badger:overworld_height` component in a JSON file.
 * @param {string} filePath - Path to the biome file.
 */
function updateBiomeFile(filePath) {
    try {
        // Read and parse the biome file
        const fileData = readFileSync(filePath, "utf8")
        const biomeData = JSON.parse(fileData)

        // Locate and update the `badger:overworld_height` component
        if (biomeData["minecraft:biome"] && biomeData["minecraft:biome"].components && biomeData["minecraft:biome"].components["badger:overworld_height"]) {
            biomeData["minecraft:biome"].components["badger:overworld_height"] = NEW_OVERWORLD_HEIGHT_CONFIG

            // Write the updated data back to the file
            writeFileSync(filePath, JSON.stringify(biomeData, null, 4), "utf8")
            console.log(`Updated: ${filePath}`)
        } else {
            console.warn(`No 'badger:overworld_height' component found in: ${filePath}`)
        }
    } catch (error) {
        console.error(`Failed to process file: ${filePath}`, error)
    }
}

/**
 * Recursively scans a directory and processes JSON files.
 * @param {string} directory - Directory to scan.
 */
function processBiomeDirectory(directory) {
    readdirSync(directory).forEach((file) => {
        const fullPath = join(directory, file)

        if (statSync(fullPath).isDirectory()) {
            processBiomeDirectory(fullPath) // Recursively process subdirectories
        } else if (extname(fullPath) === ".json") {
            updateBiomeFile(fullPath) // Update the biome file
        }
    })
}

// Start processing the biome directory
processBiomeDirectory(BIOME_DIRECTORY)
console.log("Biome files processing complete.")
