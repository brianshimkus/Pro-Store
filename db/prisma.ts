import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Set up WebSocket constructor for Neon
neonConfig.webSocketConstructor = ws

// Define the connection string
const connectionString = `${process.env.DATABASE_URL}`

// Create the configuration object (same as what you'd pass to Pool)
const poolConfig = { connectionString }

// Pass the configuration to PrismaNeon
const adapter = new PrismaNeon(poolConfig)

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
	result: {
		product: {
			price: {
				compute(product) {
					return product.price.toString()
				},
			},
			rating: {
				compute(product) {
					return product.rating.toString()
				},
			},
		},
	},
})
