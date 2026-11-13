<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_health_check_returns_ok_status(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertExactJson([
                'status' => 'ok',
            ]);
    }

    public function test_api_not_found_returns_consistent_json(): void
    {
        $response = $this->getJson('/api/v1/non-existent-route');

        $response->assertStatus(404)
            ->assertJsonStructure([
                'message',
            ]);
    }
}
